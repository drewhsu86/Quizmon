class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :content
      t.string :correct_answer
      t.string :answer_a
      t.string :answer_b
      t.string :answer_c
      t.string :answer_d
      t.boolean :private
      t.references :user, null: false, foreign_key: true
      t.references :topic, null: false, foreign_key: true

      t.timestamps
    end
  end
end
