class PostDecorator < Draper::Decorator
  # decorate :post
  delegate_all
  # decorates_association :user

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  def published_at
    object.created_at.strftime("%d %b %Y")
  end

end
