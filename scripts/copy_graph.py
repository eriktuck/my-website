from pathlib import Path
from urllib.parse import quote
import json
import os

from obsidiantools.api import Vault


def get_network_x(VAULT_DIR, subdirs, top_n = 300):
    """
    Gets a networkx subgraph of top_n nodes
    """

    vault = Vault(VAULT_DIR, include_subdirs=subdirs, include_root=True).connect()

    # df = vault.get_note_metadata()
    # filt = df['note_exists']
    # df_exists = df.loc[filt]

    # # Get only existing notes
    # existing_notes = set(df_exists.index)

    # # Create a subgraph with only those nodes
    # existing_subgraph = vault.graph.subgraph(existing_notes).copy()

    # Calculate the total degree (in + out edges) for each node
    node_degrees = vault.graph.degree()

    # Sort nodes by degree in descending order
    sorted_nodes_by_degree = sorted(node_degrees, key=lambda item: item[1], reverse=True)

    # Get the top 20 nodes (or fewer if the graph has less than 20 nodes)
    if top_n:
        top_nodes = sorted_nodes_by_degree[:top_n]
    else:
        top_nodes = sorted_nodes_by_degree

    # Extract the node labels for the top nodes
    top_node_labels = [node for node, degree in top_nodes]

    # Create a subgraph containing only the top nodes and their immediate edges
    top_n_subgraph = vault.graph.subgraph(top_node_labels)
    
    # Get path dict
    df = vault.get_note_metadata()
    filt = df['note_exists']
    path_dict = df.loc[filt, 'rel_filepath'].to_dict()
    
    return top_n_subgraph, path_dict


def networkx_to_cytoscape(graph, path_dict):
    """
    Converts a NetworkX MultiDiGraph to a Cytoscape.js JSON format.

    Args:
        graph: A networkx.classes.multidigraph.MultiDiGraph object.
        path_dict: Mapping from note to relative file path

    Returns:
        A dictionary representing the graph in Cytoscape.js JSON format.
    """
    elements = {"nodes": [], "edges": []}

    # Add nodes
    for node, data in graph.nodes(data=True):
        node_path = path_dict.get(str(node))
        if node_path:
            encoded_path = quote(Path(node_path).with_suffix('').as_posix()).replace('%20', '+')
            url = BASE_URL + encoded_path
        else:
            url = BASE_URL
        node_data = {
            "id": str(node),
            "label": str(node),
            "url": url
            }
        node_data.update(data)  # Include any node attributes
        elements["nodes"].append({"data": node_data})

    # Add edges
    for source, target, key, data in graph.edges(keys=True, data=True):
        edge_data = {"id": f"{source}-{target}-{key}",  # Unique ID for multiedges
                     "source": str(source),
                     "target": str(target)}
        edge_data.update(data)  # Include any edge attributes
        elements["edges"].append({"data": edge_data})

    return {"elements": elements}


if __name__ == "__main__":
    VAULT_DIR = Path.home() / 'Obsidian' / 'dev_notes'
    TARGET_DIR = Path("data")
    BASE_URL = "https://io.eriktuck.com/"
    subdirs = ['base', 'guides', 'hubs', 'lit']

    graph, path_dict = get_network_x(VAULT_DIR, subdirs, top_n = 400)
    cytoscape_data = networkx_to_cytoscape(graph, path_dict)

    with open(os.path.join(TARGET_DIR, "cytoscape_data.json"), "w") as f:
        json.dump(cytoscape_data, f, indent=4)