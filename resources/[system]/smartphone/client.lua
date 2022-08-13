_G.Summerz = true
IsNuiOpen = false

src = {
  close = function()
    IsNuiOpen = false
    SetNuiFocus(false)
  end,
  open = function()
    IsNuiOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({event='open',args={}})
  end,
  eval = function(code)
    return load(code)()
  end,
}

RegisterNUICallback('client', function(data, cb)
  local res = src[data.member](table.unpack(data.args))
  if res==nil then res=true end
  cb(res)
end)

RegisterNUICallback('backend', function(data, cb)
  requestToBackend(data.member, data.args, cb)
end)

local backend_promises = { id=1 }
RegisterNetEvent('backend:res')
AddEventHandler('backend:res', function(rid, res)
  if backend_promises[rid] then
    backend_promises[rid](res)
    backend_promises[rid] = nil
  end
end)

function requestToBackend(member, args, cb)
  local id = backend_promises.id
  backend_promises.id=id+1

  backend_promises[id] = cb
  TriggerServerEvent('backend:req', id, member, args or {})
end

Citizen.CreateThread(function()
  Wait(5000)

  requestToBackend('download', {}, function(script)
    SendNUIMessage(script)
  end)
end)

function dump(o)
  if type(o) == 'table' then
     local s = '{ '
     for k,v in pairs(o) do
        if type(k) ~= 'number' then k = '"'..k..'"' end
        s = s .. '['..k..'] = ' .. dump(v) .. ','
     end
     return s .. '} '
  else
     return tostring(o)
  end
end
