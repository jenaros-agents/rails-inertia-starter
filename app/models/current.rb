# frozen_string_literal: true

# Current provides thread-local attributes for the current request cycle
class Current < ActiveSupport::CurrentAttributes
  attribute :user
end
