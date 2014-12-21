class PostsController < ApplicationController

  before_action :authenticate_user!

  def index
    @posts = Post.all
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      flash[:success] = "Post was successfuly created!"
      redirect_to @post
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def post_params
    params.require(:post).permit(:title, :text)
  end
end
