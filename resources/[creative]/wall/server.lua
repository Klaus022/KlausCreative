GlobalState["creative_wall"] = math.random(213444500,213445500)
GlobalState["svcreative"] = math.random(113444500,113445500)

five = {}
module("vrp","lib/Tunnel").bindInterface(GlobalState["svcreative"],five)
local chain = GlobalState["creative_wall"]
vRP = module("vrp","lib/Proxy").getInterface("vRP")

-----------------------------------------------------------------------------------------------------------------------------------------
--[ WEBHOOK ]----------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------------
local webhookwall = ""

-----------------------------------------------------------------------------------------------------------------------------------------
-- WEBHOOK
-----------------------------------------------------------------------------------------------------------------------------------------
function SendWebhookMessage(webhook,message)
	if webhook ~= nil and webhook ~= "" then
		PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({content = message}), { ['Content-Type'] = 'application/json' })
	end
end

local wall_infos = {}
function five.setWallInfos()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id ~= nil then
        wall_infos[source] = {}
        wall_infos[source].user_id = vRP.getUserId(source)
        local name = GetPlayerName(source)
        if name == nil or name == "" or name == -1 then
            name = "N/A"
        else
            wall_infos[source].name = name
        end
        wall_infos[source].wallstats = false
	end
end

RegisterCommand("wall",function(source,args)
	local user_id = vRP.getUserId(source)
	if vRP.hasPermission(user_id,"Moderator") then
		if wall_infos[source].wallstats == true then
			wall_infos[source].wallstats = false
			TriggerClientEvent(chain..":wall",source,wall_infos[source].wallstats)
	--		print(json.encode(wall_infos,{indent = true}))
			SendWebhookMessage(webhookwall,"```prolog\n[ID]:" ..user_id.. " DESLIGOU - wall  "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
		else
			wall_infos[source].wallstats = true
			TriggerClientEvent(chain..":wall",source,wall_infos[source].wallstats)
	--		print(json.encode(wall_infos,{indent = true}))
			SendWebhookMessage(webhookwall,"```prolog\n[ID]:" ..user_id.. " LIGOU - wall  "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
		end
	end
end)

function five.getWallInfos()
	return wall_infos
end