class PostsController < ApplicationController
  before_action :fetch_tweets, only: [:index, :create, :retweet, :destroy]

  def index
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      respond_to do |format|
        format.json { render json: json_builder(@post.decorate), status: 201 }
      end
    else
      respond_to do |format|
        format.json { render json: @post.errors.to_json.titleize, status: 422 }
      end
    end
  end

  def retweet
    @post = Post.find(params[:id])
    @retweet = Post.new(parrent_id: @post.id, text: @post.text, user_id: current_user.id)
    if @retweet.save
      redirect_to posts_path
    else
      flash[:alert] = "Something went wrong. Please try again!"
      render :index
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    render :index
    flash[:success] = "Deleted successfully!"
  end

  private

  def json_builder(post)
    { id: post.id, post: post.text, published_at: post.published_at }
  end

  def fetch_tweets
    @tweets = current_user.posts.page(params[:page]).per(5)
    @tweets = PaginatingDecorator.decorate(@tweets)
  end

  def post_params
    params.require(:post).permit(:text)
  end

end
