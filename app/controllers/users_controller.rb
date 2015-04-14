class UsersController < ApplicationController

  before_action :get_user, except: [:index, :create]
  respond_to :html, :json
  skip_before_filter :verify_authenticity_token

=begin
  Place the standard CRUD actions in each  controller in the following order:
  index, show, new, edit, create, update and destroy.
=end

  def index
    @user = get_active_users
    respond_with(@users) do |format|
      format.json { render :json => @user.as_json }
      format.html
    end
  end

  def create
    @user = @user.create(user_params)
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end

  def show
    respond_with(@user.as_json)
  end

  def update
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :ok}
  end

  private

  def user_params
    params.fetch(:user, {}).permit(:name,:email,:password,:password_confirmation, is_admin)
  end

  def get_user
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end

end
