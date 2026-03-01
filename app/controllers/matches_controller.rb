class MatchesController < ApplicationController
  before_action :set_match, only: [:show, :edit, :update, :destroy]

  # GET /matches
  def index
    @matches = Match.recent
    render inertia: 'Matches/Index', props: {
      matches: @matches.map do |match|
        {
          id: match.id,
          opponent: match.opponent,
          match_date: match.match_date,
          venue: match.venue,
          home_score: match.home_score,
          away_score: match.away_score,
          result: match.result,
          updated_at: match.updated_at
        }
      end
    }
  end

  # GET /matches/1
  def show
    render inertia: 'Matches/Show', props: {
      match: {
        id: @match.id,
        opponent: @match.opponent,
        match_date: @match.match_date,
        venue: @match.venue,
        home_score: @match.home_score,
        away_score: @match.away_score,
        result: @match.result,
        youtube_url: @match.youtube_url,
        notes: @match.notes,
        created_at: @match.created_at,
        updated_at: @match.updated_at
      },
      match_penalties: @match.match_penalties.includes(:player).chronological.map do |penalty|
        {
          id: penalty.id,
          player_id: penalty.player_id,
          player_name: penalty.player&.name,
          penalty_type: penalty.penalty_type,
          minute: penalty.minute,
          description: penalty.description
        }
      end,
      match_stats: @match.match_stats.includes(:player).map do |stat|
        {
          id: stat.id,
          player_id: stat.player_id,
          player_name: stat.player&.name,
          tries: stat.tries,
          tackles: stat.tackles,
          assists: stat.assists,
          conversions: stat.conversions,
          penalties: stat.penalties,
          drops: stat.drops,
          kicks: stat.kicks
        }
      end,
      versions: @match.versions.order(created_at: :desc).map do |version|
        {
          id: version.id,
          event: version.event,
          created_at: version.created_at,
          changeset: version.changeset
        }
      end
    }
  end

  # GET /matches/new
  def new
    @match = Match.new
    render inertia: 'Matches/New', props: {
      match: {
        opponent: @match.opponent,
        match_date: @match.match_date,
        venue: @match.venue,
        home_score: @match.home_score,
        away_score: @match.away_score,
        result: @match.result,
        youtube_url: @match.youtube_url,
        notes: @match.notes
      }
    }
  end

  # GET /matches/1/edit
  def edit
    render inertia: 'Matches/Edit', props: {
      match: {
        id: @match.id,
        opponent: @match.opponent,
        match_date: @match.match_date,
        venue: @match.venue,
        home_score: @match.home_score,
        away_score: @match.away_score,
        result: @match.result,
        youtube_url: @match.youtube_url,
        notes: @match.notes
      }
    }
  end

  # POST /matches
  def create
    @match = Match.new(match_params)

    if @match.save
      redirect_to @match, notice: 'Match was successfully created.'
    else
      render inertia: 'Matches/New', props: {
        match: {
          opponent: @match.opponent,
          match_date: @match.match_date,
          venue: @match.venue,
          home_score: @match.home_score,
          away_score: @match.away_score,
          result: @match.result,
          youtube_url: @match.youtube_url,
          notes: @match.notes
        },
        errors: @match.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /matches/1
  def update
    if @match.update(match_params)
      redirect_to @match, notice: 'Match was successfully updated.'
    else
      render inertia: 'Matches/Edit', props: {
        match: {
          id: @match.id,
          opponent: @match.opponent,
          match_date: @match.match_date,
          venue: @match.venue,
          home_score: @match.home_score,
          away_score: @match.away_score,
          result: @match.result,
          youtube_url: @match.youtube_url,
          notes: @match.notes
        },
        errors: @match.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # DELETE /matches/1
  def destroy
    @match.destroy
    redirect_to matches_url, notice: 'Match was successfully deleted.'
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_match
    @match = Match.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to matches_url, alert: 'Match not found.'
  end

  # Only allow a list of trusted parameters through.
  def match_params
    params.require(:match).permit(:opponent, :match_date, :venue, :home_score, :away_score, :result, :youtube_url, :notes)
  end
end
