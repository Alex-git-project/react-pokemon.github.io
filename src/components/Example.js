import React, { useState } from 'react';

function Example() {
    // Объявляем новую переменную состояния "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Вы нажали {count} раз</p>
            <button onClick={() => setCount(count + 1)}>
                Нажми на меня
            </button>
        </div>
    );
}

export default Example;
