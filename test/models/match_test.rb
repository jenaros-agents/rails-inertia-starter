require "test_helper"

class MatchTest < ActiveSupport::TestCase
  # Validations
  test "should require opponent" do
    match = Match.new(opponent: nil)
    assert_not match.valid?
    assert_match /can't be blank/, match.errors[:opponent].join
  end

  test "should require match_date" do
    match = Match.new(match_date: nil)
    assert_not match.valid?
    assert_match /can't be blank/, match.errors[:match_date].join
  end

  test "should require venue" do
    match = Match.new(venue: nil)
    assert_not match.valid?
    assert_match /can't be blank/, match.errors[:venue].join
  end

  test "should allow nil home_score" do
    match = matches(:one)
    match.home_score = nil
    assert match.valid?
  end

  test "should allow nil away_score" do
    match = matches(:one)
    match.away_score = nil
    assert match.valid?
  end

  test "should reject negative home_score" do
    match = matches(:one)
    match.home_score = -1
    assert_not match.valid?
    assert_match /must be greater than or equal to 0/, match.errors[:home_score].join
  end

  test "should reject negative away_score" do
    match = matches(:one)
    match.away_score = -1
    assert_not match.valid?
    assert_match /must be greater than or equal to 0/, match.errors[:away_score].join
  end

  test "should allow zero scores" do
    match = matches(:one)
    match.home_score = 0
    match.away_score = 0
    match.result = nil
    assert match.valid?
  end

  test "should validate result matches scores for win" do
    match = matches(:one)
    match.result = "win"
    match.home_score = 25
    match.away_score = 20
    assert match.valid?, "Should allow win when home_score > away_score"

    match.away_score = 30
    assert_not match.valid?, "Should not allow win when home_score < away_score"
    assert_match /must be 'win' only when home_score > away_score/, match.errors[:result].join

    match.away_score = 25
    assert_not match.valid?, "Should not allow win when home_score equals away_score"
    assert_match /must be 'win' only when home_score > away_score/, match.errors[:result].join
  end

  test "should validate result matches scores for loss" do
    match = matches(:one)
    match.result = "loss"
    match.home_score = 20
    match.away_score = 25
    assert match.valid?, "Should allow loss when home_score < away_score"

    match.home_score = 30
    assert_not match.valid?, "Should not allow loss when home_score > away_score"
    assert_match /must be 'loss' only when home_score < away_score/, match.errors[:result].join

    match.home_score = 25
    assert_not match.valid?, "Should not allow loss when home_score equals away_score"
    assert_match /must be 'loss' only when home_score < away_score/, match.errors[:result].join
  end

  test "should validate result matches scores for draw" do
    match = matches(:one)
    match.result = "draw"
    match.home_score = 20
    match.away_score = 20
    assert match.valid?, "Should allow draw when home_score equals away_score"

    match.home_score = 25
    assert_not match.valid?, "Should not allow draw when home_score > away_score"
    assert_match /must be 'draw' only when home_score equals away_score/, match.errors[:result].join

    match.home_score = 15
    assert_not match.valid?, "Should not allow draw when home_score < away_score"
    assert_match /must be 'draw' only when home_score equals away_score/, match.errors[:result].join
  end

  test "should skip result validation when scores are nil" do
    match = matches(:one)
    match.result = "win"
    match.home_score = nil
    match.away_score = nil
    assert match.valid?, "Should skip validation when scores are nil"
  end

  test "should skip result validation when result is nil" do
    match = matches(:one)
    match.result = nil
    match.home_score = 25
    match.away_score = 20
    assert match.valid?, "Should skip validation when result is nil"
  end

  test "should validate youtube_url format" do
    valid_urls = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      "http://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=abc123-xyz_456"
    ]

    valid_urls.each do |url|
      match = matches(:one)
      match.youtube_url = url
      assert match.valid?, "URL #{url} should be valid"
    end
  end

  test "should reject invalid youtube_url" do
    invalid_urls = [
      "https://www.youtube.com",
      "https://www.youtube.com/",
      "https://www.youtube.com/watch",
      "https://www.youtube.com/watch?v=",
      "https://youtu.be",
      "https://youtu.be/",
      "https://notyoutube.com/watch?v=dQw4w9WgXcQ",
      "invalid-url",
      "http://",
      "https://www.youtube.com/watch?v="
    ]

    invalid_urls.each do |url|
      match = matches(:one)
      match.youtube_url = url
      assert_not match.valid?, "URL #{url} should be invalid"
    end
  end

  test "should allow nil youtube_url" do
    match = matches(:one)
    match.youtube_url = nil
    assert match.valid?
  end

  test "should allow blank youtube_url" do
    match = matches(:one)
    match.youtube_url = ""
    assert match.valid?
  end

  # Associations
  test "should have many match_penalties" do
    match = matches(:one)
    assert_respond_to match, :match_penalties
  end

  test "should have many match_stats" do
    match = matches(:one)
    assert_respond_to match, :match_stats
  end

  test "should destroy dependent match_penalties" do
    match = matches(:one)
    assert_difference("MatchPenalty.count", -match.match_penalties.count) do
      match.destroy
    end
  end

  test "should nullify dependent match_stats" do
    # Note: This test requires match_stats fixtures to be created
    # It would verify that when a match is destroyed, associated match_stats
    # have their match_id set to nil rather than being destroyed
    skip "Requires match_stats fixtures"
  end

  # Scopes
  test "recent scope should order by match_date desc" do
    recent_matches = Match.recent
    assert_equal recent_matches.first.match_date, recent_matches.map(&:match_date).max
  end

  test "by_opponent scope should filter by opponent name" do
    match = matches(:one)
    found = Match.by_opponent(match.opponent[0..5])
    assert_includes found, match
  end

  test "by_opponent scope should be case insensitive" do
    match = matches(:one)
    found = Match.by_opponent(match.opponent.downcase)
    assert_includes found, match
  end

  # PaperTrail versioning
  test "should create version on create" do
    assert_difference("PaperTrail::Version.count") do
      Match.create!(
        opponent: "Test Opponent",
        match_date: Time.current,
        venue: "Test Venue"
      )
    end
  end

  test "should create version on update" do
    match = matches(:one)
    assert_difference("PaperTrail::Version.count") do
      match.update!(opponent: "Updated Opponent")
    end
  end

  test "should create version on destroy" do
    match = matches(:one)
    assert_difference("PaperTrail::Version.count") do
      match.destroy
    end
  end

  test "should track changes in version" do
    match = matches(:one)
    match.update!(opponent: "New Opponent")
    version = match.versions.last
    assert_not_nil version
    assert_equal "update", version.event
  end

  # Edge cases
  test "should handle very high scores" do
    match = matches(:one)
    match.home_score = 150
    match.away_score = 100
    assert match.valid?
  end

  test "should handle nil result with scores" do
    match = matches(:one)
    match.result = nil
    match.home_score = 25
    match.away_score = 20
    assert match.valid?
  end

  test "should handle notes longer than 255 characters" do
    match = matches(:one)
    match.notes = "A" * 1000
    assert match.valid?
  end

  test "should handle special characters in opponent name" do
    match = matches(:one)
    match.opponent = "New Zealand (All Blacks)"
    assert match.valid?
  end

  test "should handle venue with special characters" do
    match = matches(:one)
    match.venue = "Estadio José Amalfitani"
    assert match.valid?
  end

  test "should handle youtube_url with additional parameters" do
    match = matches(:one)
    match.youtube_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s"
    assert match.valid?
  end

  test "should handle youtube short url with additional parameters" do
    match = matches(:one)
    match.youtube_url = "https://youtu.be/dQw4w9WgXcQ?t=10"
    assert match.valid?
  end

  test "should reject youtube_url without video_id" do
    match = matches(:one)
    match.youtube_url = "https://www.youtube.com/watch?v="
    assert_not match.valid?, "URL without video ID should be invalid"
  end
end
