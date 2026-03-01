class Match < ApplicationRecord
  # PaperTrail for versioning
  has_paper_trail

  # Associations
  has_many :match_penalties, dependent: :destroy
  has_many :match_stats, dependent: :nullify

  # Validations
  validates :opponent, presence: true
  validates :match_date, presence: true
  validates :venue, presence: true
  validates :home_score, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :away_score, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :result, inclusion: { in: %w[win loss draw] }, allow_nil: true
  validates :youtube_url, format: { with: /\A(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+\z/i }, allow_blank: true

  # Scopes
  scope :recent, -> { order(match_date: :desc) }
  scope :by_opponent, ->(opponent) { where("opponent ILIKE ?", "%#{opponent}%") }
end
