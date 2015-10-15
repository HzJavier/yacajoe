require 'sequel'

DB = Sequel.connect('sqlite://cajoe.db')

class Cajoes < Sequel::Model
  unless DB.table_exists? (:cajoes)
    DB.create_table :cajoes do
      primary_key :id
      varchar :msg
      varchar :video
      date :update_on_create
    end
  end
end
