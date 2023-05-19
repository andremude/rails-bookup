Rails.application.routes.draw do
  devise_for :users
  authenticated :user do
    root "pages#my_books", as: :authenticated_root
  end
  root "pages#home"
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :books, only: %i[index show create update destroy]
    end
  end
end
