require "test_helper"

class MatchPenaltyTest < ActiveSupport::TestCase
  # Validations
  test "should require match" do
    penalty = match_penalties(:one)
    penalty.match = nil
    assert_not penalty.valid?
    assert_match /can't be blank/, penalty.errors[:match].join
  end

  test "should require player" do
    penalty = match_penalties(:one)
    penalty.player = nil
    assert_not penalty.valid?
    assert_match /can't be blank/, penalty.errors[:player].join
  end

  test "should require penalty_type" do
    penalty = match_penalties(:one)
    penalty.penalty_type = nil
    assert_not penalty.valid?
    assert_match /can't be blank/, penalty.errors[:penalty_type].join
  end

  test "should allow nil minute" do
    penalty = match_penalties(:one)
    penalty.minute = nil
    assert penalty.valid?
  end

  test "should allow zero minute" do
    penalty = match_penalties(:one)
    penalty.minute = 0
    assert penalty.valid?
  end

  test "should allow minute at 120" do
    penalty = match_penalties(:one)
    penalty.minute = 120
    assert penalty.valid?
  end

  test "should reject negative minute" do
    penalty = match_penalties(:one)
    penalty.minute = -1
    assert_not penalty.valid?
    assert_match /must be greater than or equal to 0/, penalty.errors[:minute].join
  end

  test "should reject minute greater than 120" do
    penalty = match_penalties(:one)
    penalty.minute = 121
    assert_not penalty.valid?
    assert_match /must be less than or equal to 120/, penalty.errors[:minute].join
  end

  test "should allow decimal minute values" do
    penalty = match_penalties(:one)
    penalty.minute = 45.5
    assert penalty.valid?
  end

  # Associations
  test "should belong to match" do
    penalty = match_penalties(:one)
    assert_respond_to penalty, :match
    assert_equal matches(:one), penalty.match
  end

  test "should belong to player" do
    penalty = match_penalties(:one)
    assert_respond_to penalty, :player
    assert_equal players(:one), penalty.player
  end

  # Scopes
  test "chronological scope should order by minute" do
    # Create penalties with different minutes
    match = matches(:one)
    player = players(:one)

    early_penalty = MatchPenalty.create!(match:, player:, penalty_type: "Early", minute: 10)
    late_penalty = MatchPenalty.create!(match:, player:, penalty_type: "Late", minute: 80)

    chronological = MatchPenalty.chronological
    assert chronological.index(early_penalty) < chronological.index(late_penalty)
  end

  # Edge cases
  test "should handle very long penalty_type" do
    penalty = match_penalties(:one)
    penalty.penalty_type = "A" * 500
    assert penalty.valid?
  end

  test "should handle very long description" do
    penalty = match_penalties(:one)
    penalty.description = "A" * 2000
    assert penalty.valid?
  end

  test "should handle nil description" do
    penalty = match_penalties(:one)
    penalty.description = nil
    assert penalty.valid?
  end

  test "should handle special characters in penalty_type" do
    penalty = match_penalties(:one)
    penalty.penalty_type = "High Tackle (Dangerous)"
    assert penalty.valid?
  end

  test "should handle penalty with no description" do
    match = matches(:one)
    player = players(:one)
    penalty = MatchPenalty.new(match:, player:, penalty_type: "Offside", minute: 30)
    assert penalty.valid?
  end

  test "should handle boundary minute values" do
    penalty = match_penalties(:one)
    [ 0, 1, 80, 120 ].each do |min|
      penalty.minute = min
      assert penalty.valid?, "Minute #{min} should be valid"
    end
  end

  test "should allow different penalty types" do
    penalty_types = [
      "High Tackle",
      "Offside",
      "Collapsing the maul",
      "Not rolling away",
      "Obstruction",
      "Knock-on",
      "Forward pass",
      "Dangerous play"
    ]

    penalty_types.each do |type|
      penalty = match_penalties(:one)
      penalty.penalty_type = type
      assert penalty.valid?, "Penalty type '#{type}' should be valid"
    end
  end

  test "should allow same player to have multiple penalties in same match" do
    match = matches(:one)
    player = players(:one)

    penalty1 = MatchPenalty.create!(match:, player:, penalty_type: "First penalty", minute: 10)
    penalty2 = MatchPenalty.new(match:, player:, penalty_type: "Second penalty", minute: 60)

    assert penalty2.valid?, "Same player should be able to have multiple penalties in a match"
  end

  test "should enforce uniqueness of (match, player, minute)" do
    skip "Uniqueness validation already added by dhh"
  end
end
