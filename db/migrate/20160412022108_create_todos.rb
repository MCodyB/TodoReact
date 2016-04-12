class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.text :title
      t.text :body
      t.boolean :done

      t.timestamps null: false
    end
  end
end
