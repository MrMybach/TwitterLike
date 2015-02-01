class UsersController < ApplicationController

  def index
    @users = User.all - [current_user]
  end

  def show
    @user = User.find(params[:id])
    @user_posts = @user.posts.page(params[:page]).per(5)

    if @user == current_user
      redirect_to root_path
    end
  end

end
