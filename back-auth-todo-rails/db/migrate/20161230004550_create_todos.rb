class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.string :content
      t.boolean :complete, default: false
      t.string :created_by

      t.timestamps
    end
  end
end
