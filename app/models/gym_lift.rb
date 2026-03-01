class GymLift < ApplicationRecord
  # Association
  belongs_to :player

  # Validations
  validates :lift_type, presence: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :date, presence: true
end
