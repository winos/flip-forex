import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from twelvedata import TDClient
import json
import argparse

# Configurar el parser de argumentos
parser = argparse.ArgumentParser(description='Flip DataFrame of Forex Symbols')
parser.add_argument('symbol', type=str, help='Symbol to analyze (e.g., GBP/USD)')
args = parser.parse_args()

# Recibir el símbolo desde la consola
symbol = args.symbol

td = TDClient(apikey="c30ac0af06ca4533b24248fda1c28b48")
_yesterday = 'Martes'
_today = 'Miercoles'

# Construir la serie temporal necesaria
ts = td.time_series(
    symbol=symbol,
    interval="1h",
    outputsize=24,
    timezone="America/New_York",
)

base = ts.as_pandas()

df_sorted = base.sort_index(ascending=True)

def invertir_dataframe(df):
    df_invertido = df.reset_index(drop=True)
    return df_invertido

base = invertir_dataframe(base)


base['change_percent'] = base['close'].pct_change() * 100
df_sorted['change_percent'] = df_sorted['close'].pct_change() * 100

def CalculateDirection(df):
    if df['change_percent'].mean() > 0:
        tendencia = 'Bullish'
    elif df['change_percent'].mean() < 0:
        tendencia = 'Bearish'
    else:
        tendencia = 'None'

    return tendencia

# Imprimir resultados
#print("La tendencia es: ", CalculateDirection(df_sorted))

plt.figure(figsize=(14, 7))
plt.subplot(1, 2, 1)
plt.plot(df_sorted.index, df_sorted['close'], marker='*', linestyle='-', color='b')
plt.xlabel('Index Bar')
plt.ylabel('Precio')
plt.title('Yesterday (' + _yesterday + ')')
plt.grid(True)

# Subgráfico 2: Conjunto de datos resultante
plt.subplot(1, 2, 2)
plt.plot(base.index, base['close'], marker='o', linestyle='-', color='r')
plt.xlabel('Index Bar')
plt.ylabel('Precio')
plt.title('Today (' + _today + ')  + Predicted & Avg')
plt.grid(True)
plt.tight_layout()

current_date = datetime.now().strftime('%Y-%m-%d')

# Guardar la imagen con el nombre basado en el símbolo y la fecha
# Reemplazar '/' por '_' en el nombre del archivo para evitar problemas en el sistema de archivos
symbol_safe = symbol.replace('/', '_')
plt.savefig(f'./public/{symbol_safe}_{current_date}.png')

print(json.dumps(base['close'].to_json()))
