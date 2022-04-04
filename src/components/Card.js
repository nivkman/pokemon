import React, { useState } from 'react'
import {
    InformationCircleIcon
    , HeartIcon
} from '@heroicons/react/solid'
import 'animate.css';

export default function Card({ poke, index, addSaved, removeSaved }) {
    const [saved, setSaved] = useState(poke.saved);

    const handelSaved = () => {
        if (!saved === false) {
            removeSaved(index);
            if (window.location.pathname === '/') {
                setSaved(false);
            }
        }
        else {
            addSaved(index).then(result => {
                if (result) {
                    setSaved(true);
                }
            })
        }
    }

    return (
        <li
            key={index}
            className={`col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200`}
        >
            <div className="flex-1 flex flex-col p-8">
                <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={poke.name} />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                        <a
                            href={`/${poke.name}`}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                            <InformationCircleIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Learn More</span>
                        </a>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                        <a
                            onClick={() => handelSaved()}
                            className="cursor-pointer relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                            <HeartIcon className={`w-5 h-5 ${saved ? 'text-red-400' : 'text-gray-400'}`} aria-hidden="true" />
                            <span className="ml-3">{saved ? 'Saved' : 'Save'}</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}
