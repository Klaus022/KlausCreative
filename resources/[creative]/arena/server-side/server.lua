-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
local playerEnergetic = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARENA:ENTER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("arena:Enter")
AddEventHandler("arena:Enter",function(Number)
    local source = source
    local user_id = vRP.getUserId(source)
	if user_id then
        SetPlayerRoutingBucket(source,Number)
        local inventoryclean = vRP.userInventory(user_id)
        playerEnergetic[user_id] = inventoryclean
        for k,v in pairs(inventoryclean) do
            vRP.removeInventoryItem(user_id,v.item,v.amount)
        end
        vRP.giveInventoryItem(user_id,"WEAPON_PISTOL_MK2",1)
        vRP.giveInventoryItem(user_id,"energetic",10)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARENA:EXIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("arena:Exit")
AddEventHandler("arena:Exit",function()
    local source = source
    local user_id = vRP.getUserId(source)
	if user_id then
        SetPlayerRoutingBucket(source,0)
        RemoveWeaponFromPed(GetPlayerPed(source),GetHashKey("WEAPON_PISTOL_MK2"))
        vRP.removeInventoryItem(user_id,"energetic",vRP.getInventoryItemAmount(user_id,"energetic")[1])
        vRP.removeInventoryItem(user_id,"WEAPON_PISTOL_MK2",vRP.getInventoryItemAmount(user_id,"WEAPON_PISTOL_MK2")[1])
        for k,v in pairs(playerEnergetic[user_id]) do
            vRP.giveInventoryItem(user_id,v.item,v.amount)
        end
        playerEnergetic[user_id] = {}
        TriggerClientEvent("arena:Exit",source)
    end
end)
RegisterCommand("exit", function(source)
    SetPlayerRoutingBucket(source,0)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ARENA:WEAPON
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("arena:Weapon")
AddEventHandler("arena:Weapon",function()
    local source = source
    local user_id = vRP.getUserId(source)
	if user_id then
        GiveWeaponToPed(GetPlayerPed(source),GetHashKey("WEAPON_PISTOL_MK2"),-1,false,true)
    end
end)