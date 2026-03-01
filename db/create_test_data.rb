# Create test players
player1 = Player.create!(
  name: 'John Smith',
  position: 'Center',
  weight: 95.5,
  height: 185.0,
  notes: 'Experienced player with strong tackling skills. Team captain for 2 seasons.'
)

player2 = Player.create!(
  name: 'Michael Johnson',
  position: 'Prop',
  weight: 110.0,
  height: 188.0,
  notes: 'Strong scrummager, excellent in lineouts.'
)

player3 = Player.create!(
  name: 'David Williams',
  position: 'Full-back',
  weight: 88.0,
  height: 180.0,
  notes: 'Fast runner with good kicking ability.'
)

# Create some match stats for player1
MatchStat.create!(
  player: player1,
  match_date: Date.new(2026, 2, 15),
  tries: 2,
  tackles: 15,
  assists: 3,
  conversions: 1,
  penalties: 2,
  kicks: 5
)

MatchStat.create!(
  player: player1,
  match_date: Date.new(2026, 2, 22),
  tries: 1,
  tackles: 12,
  assists: 2,
  conversions: 2,
  penalties: 3,
  kicks: 8
)

# Create some gym lifts for player1
GymLift.create!(
  player: player1,
  lift_type: 'Squat',
  weight: 140.0,
  date: Date.new(2026, 2, 16)
)

GymLift.create!(
  player: player1,
  lift_type: 'Bench Press',
  weight: 110.0,
  date: Date.new(2026, 2, 16)
)

GymLift.create!(
  player: player1,
  lift_type: 'Deadlift',
  weight: 180.0,
  date: Date.new(2026, 2, 18)
)

puts "Created test data:"
puts "- #{Player.count} players"
puts "- #{MatchStat.count} match stats"
puts "- #{GymLift.count} gym lifts"
