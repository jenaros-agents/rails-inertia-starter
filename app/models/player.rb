class Player < ApplicationRecord
  # PaperTrail for versioning
  has_paper_trail

  # Associations
  has_many :match_stats, class_name: "MatchStat", dependent: :destroy
  has_many :match_penalties, dependent: :destroy
  has_many :gym_lifts, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :position, presence: true
  validates :weight, numericality: { greater_than: 0 }, allow_nil: true
  validates :height, numericality: { greater_than: 0 }, allow_nil: true
end
