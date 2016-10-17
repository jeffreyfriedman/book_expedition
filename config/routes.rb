Rails.application.routes.draw do
  devise_for :users
  # devise_scope :user do
  #   root to: "devise/registrations#edit"
  # end

  root 'static_pages#index'

  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :destinations, only: [:index, :create]
    end
  end
end
