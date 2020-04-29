const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7,
  },
  {
    title:'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    id: '5a422bc61b54a676234d17fd',
    title:'TDD harms architecture',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes:0,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}