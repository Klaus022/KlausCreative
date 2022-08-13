five = module("vrp","lib/Tunnel").getInterface(GlobalState["svcreative"])

local wall = false
local walldistance = 500 -- OneSync Infinity Max Distance
local admin = true
local armas = {
    [tostring(GetHashKey('WEAPON_ANIMAL'))] = 'Animal', [tostring(GetHashKey('WEAPON_COUGAR'))] = 'Cougar', [tostring(GetHashKey('WEAPON_ADVANCEDRIFLE'))] = 'Advanced Rifle',
    [tostring(GetHashKey('WEAPON_APPISTOL'))] = 'AP Pistol', [tostring(GetHashKey('WEAPON_ASSAULTRIFLE'))] = 'Assault Rifle', [tostring(GetHashKey('WEAPON_ASSAULTRIFLE_MK2'))] = 'Assault Rifke Mk2',
    [tostring(GetHashKey('WEAPON_ASSAULTSHOTGUN'))] = 'Assault Shotgun', [tostring(GetHashKey('WEAPON_ASSAULTSMG'))] = 'Assault SMG', [tostring(GetHashKey('WEAPON_AUTOSHOTGUN'))] = 'Automatic Shotgun',
    [tostring(GetHashKey('WEAPON_BULLPUPRIFLE'))] = 'Bullpup Rifle', [tostring(GetHashKey('WEAPON_BULLPUPRIFLE_MK2'))] = 'Bullpup Rifle Mk2',[tostring(GetHashKey('WEAPON_BULLPUPSHOTGUN'))] = 'Bullpup Shotgun',
    [tostring(GetHashKey('WEAPON_CARBINERIFLE'))] = 'Carbine Rifle', [tostring(GetHashKey('WEAPON_CARBINERIFLE_MK2'))] = 'Carbine Rifle Mk2', [tostring(GetHashKey('WEAPON_COMBATMG'))] = 'Combat MG',
    [tostring(GetHashKey('WEAPON_COMBATMG_MK2'))] = 'Combat MG Mk2', [tostring(GetHashKey('WEAPON_COMBATPDW'))] = 'Combat PDW', [tostring(GetHashKey('WEAPON_COMBATPISTOL'))] = 'Combat Pistol',
    [tostring(GetHashKey('WEAPON_COMPACTRIFLE'))] = 'Compact Rifle', [tostring(GetHashKey('WEAPON_DBSHOTGUN'))] = 'Double Barrel Shotgun', [tostring(GetHashKey('WEAPON_DOUBLEACTION'))] = 'Double Action Revolver',
    [tostring(GetHashKey('WEAPON_FLAREGUN'))] = 'Flare gun', [tostring(GetHashKey('WEAPON_GUSENBERG'))] = 'Gusenberg', [tostring(GetHashKey('WEAPON_HEAVYPISTOL'))] = 'Heavy Pistol',
    [tostring(GetHashKey('WEAPON_HEAVYSHOTGUN'))] = 'Heavy Shotgun', [tostring(GetHashKey('WEAPON_HEAVYSNIPER'))] = 'Heavy Sniper', [tostring(GetHashKey('WEAPON_HEAVYSNIPER_MK2'))] = 'Heavy Sniper',
    [tostring(GetHashKey('WEAPON_MACHINEPISTOL'))] = 'Machine Pistol', [tostring(GetHashKey('WEAPON_MARKSMANPISTOL'))] = 'Marksman Pistol', [tostring(GetHashKey('WEAPON_MARKSMANRIFLE'))] = 'Marksman Rifle',
    [tostring(GetHashKey('WEAPON_MARKSMANRIFLE_MK2'))] = 'Marksman Rifle Mk2', [tostring(GetHashKey('WEAPON_MG'))] = 'MG', [tostring(GetHashKey('WEAPON_MICROSMG'))] = 'Micro SMG',
    [tostring(GetHashKey('WEAPON_MINIGUN'))] = 'Minigun', [tostring(GetHashKey('WEAPON_MINISMG'))] = 'Mini SMG', [tostring(GetHashKey('WEAPON_MUSKET'))] = 'Musket',
    [tostring(GetHashKey('WEAPON_PISTOL'))] = 'Pistol', [tostring(GetHashKey('WEAPON_PISTOL_MK2'))] = 'Pistol Mk2', [tostring(GetHashKey('WEAPON_PISTOL50'))] = 'Pistol .50',
    [tostring(GetHashKey('WEAPON_PUMPSHOTGUN'))] = 'Pump Shotgun', [tostring(GetHashKey('WEAPON_PUMPSHOTGUN_MK2'))] = 'Pump Shotgun Mk2', [tostring(GetHashKey('WEAPON_RAILGUN'))] = 'Railgun',
    [tostring(GetHashKey('WEAPON_REVOLVER'))] = 'Revolver', [tostring(GetHashKey('WEAPON_REVOLVER_MK2'))] = 'Revolver Mk2', [tostring(GetHashKey('WEAPON_SAWNOFFSHOTGUN'))] = 'Sawnoff Shotgun',
    [tostring(GetHashKey('WEAPON_SMG'))] = 'SMG', [tostring(GetHashKey('WEAPON_SMG_MK2'))] = 'SMG Mk2', [tostring(GetHashKey('WEAPON_SNIPERRIFLE'))] = 'Sniper Rifle',
    [tostring(GetHashKey('WEAPON_SNSPISTOL'))] = 'SNS Pistol', [tostring(GetHashKey('WEAPON_SNSPISTOL_MK2'))] = 'SNS Pistol Mk2', [tostring(GetHashKey('WEAPON_SPECIALCARBINE'))] = 'Special Carbine',
    [tostring(GetHashKey('WEAPON_SPECIALCARBINE_MK2'))] = 'Special Carbine Mk2', [tostring(GetHashKey('WEAPON_STINGER'))] = 'Stinger', [tostring(GetHashKey('WEAPON_STUNGUN'))] = 'Stungun',
    [tostring(GetHashKey('WEAPON_VINTAGEPISTOL'))] = 'Vintage Pistol', [tostring(GetHashKey('VEHICLE_WEAPON_PLAYER_LASER'))] = 'Vehicle Lasers',
    [tostring(GetHashKey('WEAPON_FIRE'))] = 'Fire', [tostring(GetHashKey('WEAPON_FLARE'))] = 'Flare', [tostring(GetHashKey('WEAPON_FLAREGUN'))] = 'Flaregun',
    [tostring(GetHashKey('WEAPON_MOLOTOV'))] = 'Molotov', [tostring(GetHashKey('WEAPON_PETROLCAN'))] = 'Petrol Can', [tostring(GetHashKey('WEAPON_HELI_CRASH'))] = 'Helicopter Crash',
    [tostring(GetHashKey('WEAPON_RAMMED_BY_CAR'))] = 'Rammed by Vehicle', [tostring(GetHashKey('WEAPON_RUN_OVER_BY_CAR'))] = 'Ranover by Vehicle', [tostring(GetHashKey('VEHICLE_WEAPON_SPACE_ROCKET'))] = 'Vehicle Space Rocket',
    [tostring(GetHashKey('VEHICLE_WEAPON_TANK'))] = 'Tank', [tostring(GetHashKey('WEAPON_AIRSTRIKE_ROCKET'))] = 'Airstrike Rocket', [tostring(GetHashKey('WEAPON_AIR_DEFENCE_GUN'))] = 'Air Defence Gun',
    [tostring(GetHashKey('WEAPON_COMPACTLAUNCHER'))] = 'Compact Launcher', [tostring(GetHashKey('WEAPON_EXPLOSION'))] = 'Explosion', [tostring(GetHashKey('WEAPON_FIREWORK'))] = 'Firework',
    [tostring(GetHashKey('WEAPON_GRENADE'))] = 'Grenade', [tostring(GetHashKey('WEAPON_GRENADELAUNCHER'))] = 'Grenade Launcher', [tostring(GetHashKey('WEAPON_HOMINGLAUNCHER'))] = 'Homing Launcher',
    [tostring(GetHashKey('WEAPON_PASSENGER_ROCKET'))] = 'Passenger Rocket', [tostring(GetHashKey('WEAPON_PIPEBOMB'))] = 'Pipe bomb', [tostring(GetHashKey('WEAPON_PROXMINE'))] = 'Proximity Mine',
    [tostring(GetHashKey('WEAPON_RPG'))] = 'RPG', [tostring(GetHashKey('WEAPON_STICKYBOMB'))] = 'Sticky Bomb', [tostring(GetHashKey('WEAPON_VEHICLE_ROCKET'))] = 'Vehicle Rocket',
    [tostring(GetHashKey('WEAPON_BZGAS'))] = 'BZ Gas', [tostring(GetHashKey('WEAPON_FIREEXTINGUISHER'))] = 'Fire Extinguisher', [tostring(GetHashKey('WEAPON_SMOKEGRENADE'))] = 'Smoke Grenade',
    [tostring(GetHashKey('WEAPON_BATTLEAXE'))] = 'Battleaxe', [tostring(GetHashKey('WEAPON_BOTTLE'))] = 'Bottle', [tostring(GetHashKey('WEAPON_KNIFE'))] = 'Knife',
    [tostring(GetHashKey('WEAPON_MACHETE'))] = 'Machete', [tostring(GetHashKey('WEAPON_SWITCHBLADE'))] = 'Switch Blade', [tostring(GetHashKey('OBJECT'))] = 'Object',
    [tostring(GetHashKey('VEHICLE_WEAPON_ROTORS'))] = 'Vehicle Rotors', [tostring(GetHashKey('WEAPON_BALL'))] = 'Ball', [tostring(GetHashKey('WEAPON_BAT'))] = 'Bat',
    [tostring(GetHashKey('WEAPON_CROWBAR'))] = 'Crowbar', [tostring(GetHashKey('WEAPON_FLASHLIGHT'))] = 'Flashlight', [tostring(GetHashKey('WEAPON_GOLFCLUB'))] = 'Golfclub',
    [tostring(GetHashKey('WEAPON_HAMMER'))] = 'Hammer', [tostring(GetHashKey('WEAPON_HATCHET'))] = 'Hatchet', [tostring(GetHashKey('WEAPON_HIT_BY_WATER_CANNON'))] = 'Water Cannon',
    [tostring(GetHashKey('WEAPON_KNUCKLE'))] = 'Knuckle', [tostring(GetHashKey('WEAPON_NIGHTSTICK'))] = 'Night Stick', [tostring(GetHashKey('WEAPON_POOLCUE'))] = 'Pool Cue',
    [tostring(GetHashKey('WEAPON_SNOWBALL'))] = 'Snowball', [tostring(GetHashKey('WEAPON_WRENCH'))] = 'Wrench', [tostring(GetHashKey('WEAPON_DROWNING'))] = 'Drowned',
    [tostring(GetHashKey('WEAPON_DROWNING_IN_VEHICLE'))] = 'Drowned in Vehicle', [tostring(GetHashKey('WEAPON_BARBED_WIRE'))] = 'Barbed Wire', [tostring(GetHashKey('WEAPON_BLEEDING'))] = 'Bleed',
    [tostring(GetHashKey('WEAPON_ELECTRIC_FENCE'))] = 'Electric Fence', [tostring(GetHashKey('WEAPON_EXHAUSTION'))] = 'Exhaustion', [tostring(GetHashKey('WEAPON_FALL'))] = 'Falling',
}

RegisterNetEvent(GlobalState["creative_wall"]..":wall")
AddEventHandler(GlobalState["creative_wall"]..":wall",function(val)
    wall = val
 --   print("Wall: "..tostring(val))
    if wall then
        TriggerEvent("Notify","verde","Wall Ativado!",3000)
    else
        TriggerEvent("Notify","vermelho","Wall Desativado!",3000)
    end
end)

function notify(msg)
    SetNotificationTextEntry("STRING")
    AddTextComponentString(msg)
    DrawNotification(false, false)
end

local wall_users = {}


Citizen.CreateThread(
    function()
        five.setWallInfos()
        while true do
            local time = 5000
            if wall then
                wall_users = five.getWallInfos()
                time = 2000
            end
            Citizen.Wait(time)
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            local time = 2000
            if wall then
                local ped_id = PlayerPedId()
                for k, id in ipairs(GetActivePlayers()) do
                    local src = GetPlayerServerId(id)
                    local nped_id = GetPlayerPed(id)
                    --and nped_id ~= ped_id
                    if ((NetworkIsPlayerActive( id ))) then
                        x1, y1, z1 = table.unpack( GetEntityCoords( ped_id, true ) )
                        x2, y2, z2 = table.unpack( GetEntityCoords( nped_id, true ) )
                        distance = math.floor(GetDistanceBetweenCoords(x1,  y1,  z1,  x2,  y2,  z2,  true))	
                        x,y,z = table.unpack(GetPedBoneCoords(nped_id, 0, 0.0, 0.0, -0.9))
                        px,py,pz = table.unpack(GetGameplayCamCoord())
                        if nped_id ~= -1 and wall_users[src] ~= nil then
                            if GetDistanceBetweenCoords(x, y, z, px, py, pz, true) <= walldistance then
                                local armour = GetPedArmour(nped_id)
                                local health = math.floor(GetEntityHealth(nped_id))
                                local armahash = GetSelectedPedWeapon(nped_id)
                                local skin = GetEntityModel(nped_id)
                                local arma = nil
                                local linecolour = true
        
                                if armahash == 0 then
                                    arma = "Arma Desconhecida"
                                else
                                    if armas[tostring(armahash)] ~= nil then
                                        arma = armas[tostring(armahash)]
                                    else
                                        arma = nil
                                    end
                                end

                                DrawTextW(x2, y2, z2+0.15,"~w~["..wall_users[src].user_id.."] ~w~"..wall_users[src].name.." ")

                                local tab = "\n"
                                local defaulttext = tab.."~w~Vida:~g~"..health.." ~w~|| Colete:~b~"..armour.."~w~"

                                if wall_users[src].wallstats == true then
                                    defaulttext = defaulttext.." ~w~[~g~Wall On~w~]"
                                end

                                DrawTextW(x2, y2, z2+0.15,defaulttext)
                        
                                if arma ~= nil then
                                    tab = tab.."\n"
                                    DrawTextW(x2, y2, z2+0.15,tab.."~w~"..arma.."")
                                end
                                
                                tab = tab.."\n"
                                DrawTextW(x2, y2, z2+0.15,tab.."~w~Multiplicador Dano:~g~"..math.floor(GetPlayerWeaponDamageModifier(id)).."~w~")
                                
                                if not IsEntityVisible(nped_id) then
                                    tab = tab.."\n"
                                    DrawTextW(x2, y2, z2+0.15,tab.."~r~Invisivel~w~")
                                    linecolour = false
                                end

                                if skin ~= 1885233650 and skin ~= -1667301416 then
                                    tab = tab.."\n"
                                    DrawTextW(x2, y2, z2+0.15,tab.."~w~Model: ~r~"..skin.."~w~")
                                    linecolour = false
                                end

                                if not linecolour then
                                    DrawLine(x2, y2, z2, x1, y1, z1, 255, 0, 0, 255)
                                else
                                    DrawLine(x2, y2, z2, x1, y1, z1, 0, 0, 255, 255)
                                end     
                            end
                        end
                    end
                end
                time = 2
            end
            Citizen.Wait(time)
        end
    end
)



function DrawTextW(x,y,z, text, r,g,b)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    local px,py,pz=table.unpack(GetGameplayCamCoords())
    local dist = GetDistanceBetweenCoords(px,py,pz, x,y,z, 1)
    local scale = (1/dist)*2
    local fov = (1/GetGameplayCamFov())*100
    local scale = scale*fov
    if onScreen then
        SetTextFont(4)
        SetTextProportional(1)
        SetTextScale(0.4, 0.4)
        SetTextColour(r, g, b, 255)
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x,_y)
    end
end