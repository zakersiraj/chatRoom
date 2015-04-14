class MessagesController < ApplicationController

  before_action :get_message, except: [:index, :create]
  respond_to :html, :json
  skip_before_filter :verify_authenticity_token

=begin
  Place the standard CRUD actions in each  controller in the following order:
  index, show, new, edit, create, update and destroy.
=end

  def index
  end

  def create
    @message = @message.create(message_params)
    if @message.save
      render json: @message.as_json, status: :ok
    else
      render json: {message: @message.errors, status: :no_content}
    end
  end

  def show
    respond_with(@message.as_json)
  end

  def update
    if @message.update_attributes(message_params)
      render json: @message.as_json, status: :ok
    else
      render json: {message: @message.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @message.destroy
    render json: {status: :ok}
  end

  private

  def message_params
    params.fetch(:message, {}).permit(:message, :ip_address)
  end

  def get_message
    @message = Message.find(params[:id])
    render json: {status: :not_found} unless @message
  end

end
