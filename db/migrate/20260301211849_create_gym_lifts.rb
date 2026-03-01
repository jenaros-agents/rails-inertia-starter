class CreateGymLifts < ActiveRecord::Migration[8.1]
  def change
    create_table :gym_lifts do |t|
      t.references :player, null: false, foreign_key: true
      t.string :lift_type
      t.decimal :weight
      t.date :date

      t.timestamps
    end
  end
end
