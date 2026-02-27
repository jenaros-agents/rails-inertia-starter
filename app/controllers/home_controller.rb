class HomeController < ApplicationController
  def index
    render inertia: 'HomePage'
  end
end
