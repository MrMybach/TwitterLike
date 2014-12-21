class PostsController < ApplicationController

  before_action :authenticate_user!, except: [:index]

  def index

  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
  end

  private

  def post_params
    params.require(:post).permit(:title, :text)
  end
end
