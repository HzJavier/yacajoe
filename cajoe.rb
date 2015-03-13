require 'sinatra'
require 'json'
$signature = ARGV[0]
$cayo = {'cajoe'=>'No'}
before do
  headers['Access-Control-Allow-Methods'] = 'GET, POST'
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
  headers['Access-Control-Allow-Credentials'] = 'true'
end

get '/' do
  $cayo.to_json
end
post '/cajoe' do
  cayo = JSON.parse(request.body.read)
  if cayo['sig'] != $signature
    halt 368, "Oye... tranquilo viejo!"
  end
  $cayo['cajoe'] = cayo['cajoe']
  $cayo['videoSrc'] = cayo['video']
  "Success"
end
