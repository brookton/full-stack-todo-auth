# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
Todo.destroy_all

User.create(name:"David", email:"hello@david.com", password:"123456")

5.times do
  todo = Todo.create(title: Faker::Lorem.word, content: Faker::Lorem.word, created_by: User.first.id)
end
