Rails.application.routes.draw do
  devise_for :users
  root "pages#home"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :books, only: %i[index show create update destroy]
    end
  end
end
