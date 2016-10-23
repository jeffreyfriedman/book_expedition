Rails.application.routes.draw do
  devise_for :users

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
      resources :destinations, only: [:index, :show, :create, :destroy]
      resources :books, only: [:index, :create, :destroy]
      resources :userbooks, only: [:create, :destroy]
      resources :userdestinations, only: [:update, :destroy]
    end
  end
end
