class CreatePlayers < ActiveRecord::Migration[8.1]
  def change
    create_table :players do |t|
      t.string :name
      t.string :position
      t.decimal :weight
      t.decimal :height
      t.text :notes

      t.timestamps
    end
  end
end
