require 'sinatra'
require 'json'
$signature = ARGV[0]
$cayo = {'cajoe'=>'No'}
get '/' do
  $cayo.to_json
end
post '/cajoe' do
  cayo = JSON.parse(request.body.read)
  if cayo['sig'] != $signature
    halt 368, "Oye... tranquilo viejo!"
  end
  $cayo['cajoe'] = cayo['cajoe']
end
