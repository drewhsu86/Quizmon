class Question < ApplicationRecord
  belongs_to :user
  belongs_to :topic
  has_many :comments, dependent: :destroy
  has_many :completeds, dependent: :destroy
  
  validates :correct_answer, inclusion: { in: %w(a b c d), message: "%{value} is not a valid answer."}
  validates :difficulty, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 5 }
end
