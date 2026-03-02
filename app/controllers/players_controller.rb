class PlayersController < ApplicationController
  before_action :set_player, only: [ :show, :edit, :update, :destroy ]

  # GET /players
  def index
    @players = Player.order(:name)
    render inertia: "Players/Index", props: {
      players: @players.map do |player|
        {
          id: player.id,
          name: player.name,
          position: player.position,
          weight: player.weight,
          height: player.height,
          updated_at: player.updated_at
        }
      end
    }
  end

  # GET /players/1
  def show
    render inertia: "Players/Show", props: {
      player: {
        id: @player.id,
        name: @player.name,
        position: @player.position,
        weight: @player.weight,
        height: @player.height,
        notes: @player.notes,
        created_at: @player.created_at,
        updated_at: @player.updated_at
      },
      match_stats: @player.match_stats.order(match_date: :desc).map do |stat|
        {
          id: stat.id,
          match_date: stat.match_date,
          tries: stat.tries,
          tackles: stat.tackles,
          assists: stat.assists,
          conversions: stat.conversions,
          penalties: stat.penalties,
          drops: stat.drops,
          kicks: stat.kicks
        }
      end,
      gym_lifts: @player.gym_lifts.order(date: :desc).map do |lift|
        {
          id: lift.id,
          lift_type: lift.lift_type,
          weight: lift.weight,
          date: lift.date
        }
      end,
      versions: @player.versions.order(created_at: :desc).map do |version|
        {
          id: version.id,
          event: version.event,
          created_at: version.created_at,
          changeset: version.changeset
        }
      end
    }
  end

  # GET /players/new
  def new
    @player = Player.new
    render inertia: "Players/New", props: {
      player: {
        name: @player.name,
        position: @player.position,
        weight: @player.weight,
        height: @player.height,
        notes: @player.notes
      }
    }
  end

  # GET /players/1/edit
  def edit
    render inertia: "Players/Edit", props: {
      player: {
        id: @player.id,
        name: @player.name,
        position: @player.position,
        weight: @player.weight,
        height: @player.height,
        notes: @player.notes
      }
    }
  end

  # POST /players
  def create
    @player = Player.new(player_params)

    if @player.save
      redirect_to @player, notice: "Player was successfully created."
    else
      render inertia: "Players/New", props: {
        player: {
          name: @player.name,
          position: @player.position,
          weight: @player.weight,
          height: @player.height,
          notes: @player.notes
        },
        errors: @player.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      redirect_to @player, notice: "Player was successfully updated."
    else
      render inertia: "Players/Edit", props: {
        player: {
          id: @player.id,
          name: @player.name,
          position: @player.position,
          weight: @player.weight,
          height: @player.height,
          notes: @player.notes
        },
        errors: @player.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # DELETE /players/1
  def destroy
    @player.destroy
    redirect_to players_url, notice: "Player was successfully deleted."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_player
    @player = Player.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def player_params
    params.require(:player).permit(:name, :position, :weight, :height, :notes)
  end
end
