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

  # Strengthened YouTube URL validation - requires valid video ID
  validates :youtube_url, format: {
    with: /\A(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+)(\S*)?\z/i,
    message: "must be a valid YouTube URL with a video ID"
  }, allow_blank: true

  # Custom validation: result must match scores
  validate :result_matches_scores, if: -> { result.present? && home_score.present? && away_score.present? }

  # Scopes
  scope :recent, -> { order(match_date: :desc) }
  scope :by_opponent, ->(opponent) { where("LOWER(opponent) LIKE LOWER(?)", "%#{opponent}%") }

  private

  def result_matches_scores
    case result
    when "win"
      errors.add(:result, "must be 'win' only when home_score > away_score") unless home_score > away_score
    when "loss"
      errors.add(:result, "must be 'loss' only when home_score < away_score") unless home_score < away_score
    when "draw"
      errors.add(:result, "must be 'draw' only when home_score equals away_score") unless home_score == away_score
    end
  end
end
