class TodoSerializer < ActiveModel::Serializer
  # attributes to be serialized
  attributes :id, :title, :content, :complete, :created_by, :created_at, :updated_at
  # model association
  # has_many :items
end
