const { AuthenticationError } = require('apollo-server-express')
const { User, Order } = require('../models')
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

const resolvers = {
  Query: {
    getStar: async (parent) => {
      const categories = [
        {
          type: 'Red Giant',
          price: 25,
        },
        {
          type: 'White Dwarf',
          price: 20,
        },
        {
          type: 'Neutron',
          price: 15,
        },
        {
          type: 'Red Dwarf',
          price: 10,
        },
        {
          type: 'Brown Dwarf',
          price: 5,
        },
      ]
      const category =
        categories[Math.floor(Math.random() * categories.length())]

      return {
        index: `GSC-${Math.floor(Math.random() * 10000)}`,
        name: '',
        type: category.type,
        price: category.price,
      }
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('Order')

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate)

        return user
      }

      throw new GraphQLError('Not logged in!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('Order')

        return user.orders.id(_id)
      }

      throw new GraphQLError('Not logged in!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin
      const order = new Order({ star: { ...args } })
      const line_items = []

      const star = await stripe.products.create({
        name: star.name,
        description: star.type,
      })

      const price = await stripe.prices.create({
        star: star.index,
        unit_amount: star.price * 100,
        currency: 'usd',
      })

      line_items.push({
        price: price.id,
        quantity: 1,
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      })

      return { session: session.id }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    addOrder: async (parent, { star }, context) => {
      console.log(context)
      if (context.user) {
        const order = new Order({ star })

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        })

        return order
      }

      throw new GraphQLError('Not logged in!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        })
      }

      throw new GraphQLError('Not logged in!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    },
    // updateProduct: async (parent, { _id, quantity }) => {
    //   const decrement = Math.abs(quantity) * -1

    //   return await Product.findByIdAndUpdate(
    //     _id,
    //     { $inc: { quantity: decrement } },
    //     { new: true },
    //   )
    // },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new GraphQLError('Incorrect credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new GraphQLError('Incorrect credentials', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }

      const token = signToken(user)

      return { token, user }
    },
  },
}

module.exports = resolvers
