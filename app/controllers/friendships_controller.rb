class FriendshipsController < ApplicationController
  def create
    @friendship = Friendship.new
    @friendship.user = current_user
    @friendship.friend = User.find(params[:id])
    if @friendship.save
      flash[:success] = "User added as a friend!"
      redirect_to root_path
    else
      flash[:success] = "I have bad feeling about this"
      render :new
    end
  end
end
