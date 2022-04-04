import React from 'react';

export default function Description({ props }) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex items-baseline justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 self-center mr-2">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h3>
                <img className="self-center" src={props.img} alt={props.name} height={100} width={100} />
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Type</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.types?.length && props.types.map((elm, i) => (
                                <span key={i}>{elm.type.name}{i < props.types.length - 1 ? ', ' : null}</span>
                            ))}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Abilities</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.abilities?.length && props.abilities.map((elm, i) => (
                                <span key={i}>{elm.ability.name}{i < props.abilities.length - 1 ? ', ' : null}</span>
                            ))}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Moves</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.moves?.length && props.moves.map((elm, i) => (
                                <span key={i}>{elm.move.name}{i < props.moves.length - 1 ? ', ' : null}</span>
                            ))}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Locations</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.locationAreas.length ? props.locationAreas.length && props.locationAreas.map((elm, i) => (
                                <span key={i}>{elm.location_area.name}{i < props.locationAreas.length - 1 ? ', ' : null}</span>
                            )) : 'unknown'}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Evolutions</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.evolutions.map((elm, i) => (
                                <span key={i}>{elm}{i < props.evolutions.length - 1 ? ', ' : null}</span>
                            ))}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Evolves From</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.evolvesFromSpecies ? props.evolvesFromSpecies.name : '-'}
                        </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Games Appearances</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {props.games.map((elm, i) => (
                                <span key={i}>{elm.version.name}{i < props.games.length - 1 ? ', ' : null}</span>
                            ))}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
