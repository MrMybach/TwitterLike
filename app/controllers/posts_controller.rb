class PostsController < ApplicationController

  def index
    @posts = current_user.posts.page(params[:page]).per(5)
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      flash[:success] = "Post was successfuly created!"
      redirect_to posts_path
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :new
    end
  end

  def show
    @post = current_user.posts.find(params[:id])
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
