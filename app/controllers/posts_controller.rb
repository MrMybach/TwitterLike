class PostsController < ApplicationController

  before_action :authenticate_user!

  def index
    @posts = current_user.posts.all
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
    @post = current_user.posts.find(params[:id])
  end

  def edit
    @post = current_user.posts.find(params[:id])
  end

  def update
    @post = current_user.posts.find(params[:id])
    if @post.update_attributes(post_params)
      flash[:success] = "Edit successfull!"
      redirect_to @post
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :edit
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    redirect_to root_path
    flash[:success] = "Deleted successfully!"
  end

  private

  def post_params
    params.require(:post).permit(:title, :text)
  end

end
