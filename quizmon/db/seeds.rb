# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Question.destroy_all
Topic.destroy_all 
User.destroy_all 

@user = User.create!({ username: 'memer5000', email: 'popandlock@email.com', password: '123456' })

p "#{User.count} user(s) created"

@javascript = Topic.create!(name: 'Javascript')
@ruby = Topic.create!(name: 'Ruby')
@data_structures = Topic.create!(name: 'Data structures')

p "#{Topic.count} topic(s) created"

@q1 = Question.create!({content: 'Test question, the answer is C.',correct_answer: 'c', answer_a: 'test answer A', answer_b: 'test answer B',answer_c: 'test answer C',answer_d: 'test answer D',private: false,user: @user,topic: @ruby 
})

p "#{Question.count} question(s) created"
