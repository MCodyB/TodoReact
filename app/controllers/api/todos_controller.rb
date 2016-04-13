class Api::TodosController < ApplicationController
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /api/todos
  # GET /api/todos.json
  def index
    @todos = Todo.all
    render json: [:api, @todos]
  end

  # GET /api/todos/1
  # GET /api/todos/1.json
  def show
  end


  # POST /api/todos
  # POST /api/todos.json
  def create
    respond_to do |format|
      if @todo = Todo.create!(todo_params)
        format.json { render :show, status: :created, location: [:api, @todo] }
      else
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /api/todos/1
  # PATCH/PUT /api/todos/1.json
  def update
    respond_to do |format|
      if @todo.update!(todo_params)
        format.html { redirect_to [:api, @todo], notice: 'Todo was successfully updated.' }
        format.json { render :show, status: :ok, location: [:api, @todo] }
      else
        format.html { render :edit }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /api/todos/1
  # DELETE /api/todos/1.json
  def destroy
    @todo.destroy!
    respond_to do |format|
      format.html { redirect_to api_todos_path, notice: 'Todo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:title, :body, :done)
    end
end
