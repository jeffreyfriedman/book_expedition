Rails.application.routes.draw do
  devise_for :users
  # devise_scope :user do
  #   root to: "devise/registrations#edit"
  # end

  # root 'static_pages#index'

  # resources :users, only: [:show]

  devise_scope :user do
    authenticated :user do
      root "static_pages#dashboard", as: :authenticated_root
    end
    unauthenticated :user do
      root 'static_pages#index', as: :unauthenticated_root
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :destinations, only: [:index, :create]
    end
  end
end
