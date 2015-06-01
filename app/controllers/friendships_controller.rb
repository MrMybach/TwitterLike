class FriendshipsController < ApplicationController
  def create
    @friendship = Friendship.new
    @friendship.user = current_user
    @friendship.friend = User.find(params[:friend_id])

    if @friendship.save
      respond_to do |format|
        format.json { head :created }
      end
    else
      respond_to do |format|
        format.json { render json: @friendship.errors.to_json.titleize, status: 422 }
      end
    end
  end
end
