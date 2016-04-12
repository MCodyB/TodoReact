class Todo < ActiveRecord::Base
  validates :done, inclusion: [true, false]
end
