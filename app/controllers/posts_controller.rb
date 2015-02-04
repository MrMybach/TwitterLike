class PostsController < ApplicationController
  before_action :fetch_posts, only: [:index, :create, :retweet, :destroy]

  def index
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      flash[:success] = "Post was successfuly created!"
      redirect_to posts_path
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :index
    end
  end

  def retweet
    @post = Post.find(params[:id])
    @retweet = Post.new(parrent_id: @post.id, text: @post.text, user_id: current_user.id)
    if @retweet.save
      flash[:success] = "Retweeted!"
      redirect_to posts_path
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :index
    end
  end

  def show
    @post = current_user.posts.find(params[:id])
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    render :index
    flash[:success] = "Deleted successfully!"
  end

  private

  def fetch_posts
    @posts = current_user.posts.page(params[:page]).per(5)
  end

  def post_params
    params.require(:post).permit(:text)
  end

end
